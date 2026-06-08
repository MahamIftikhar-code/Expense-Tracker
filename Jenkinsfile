pipeline {
    agent { label 'mhm' }

    environment {
        BACKEND_IMAGE  = "mahamiftikhar/expense-backend"
        FRONTEND_IMAGE = "mahamiftikhar/expense-frontend"
        DOCKER_TAG     = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub'
                checkout scm
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
                echo 'Backend tests passed'
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    withCredentials([
                        string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                        string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                    ]) {
                        sh 'terraform init -upgrade'
                        sh 'terraform apply -auto-approve'
                        script {
                            env.EC2_IP = sh(
                                script: 'terraform output -raw ec2_public_ip',
                                returnStdout: true
                            ).trim()
                        }
                    }
                }
                echo "EC2 provisioned at: ${env.EC2_IP}"
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${DOCKER_TAG} ."
                    sh "docker tag ${BACKEND_IMAGE}:${DOCKER_TAG} ${BACKEND_IMAGE}:latest"
                }
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${DOCKER_TAG} ."
                    sh "docker tag ${FRONTEND_IMAGE}:${DOCKER_TAG} ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // FIX: correct credential ID 'dockerhub-cred' (previous project mein 'dockerHubCred' tha — wrong)
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // FIX: sleep 40 taake EC2 fully boot ho jaye SSH se pehle
                sh """
                    sleep 40
                    ssh -i ~/expense-app-key.pem \
                        -o StrictHostKeyChecking=no \
                        -o ConnectTimeout=30 \
                        ubuntu@${env.EC2_IP} '
                        docker pull mahamiftikhar/expense-backend:latest
                        docker pull mahamiftikhar/expense-frontend:latest
                        docker stop expense-backend expense-frontend expense-mongo 2>/dev/null || true
                        docker rm expense-backend expense-frontend expense-mongo 2>/dev/null || true
                        docker network create expense-net 2>/dev/null || true
                        docker run -d \
                            --name expense-mongo \
                            --network expense-net \
                            --restart unless-stopped \
                            -v mongo-data:/data/db \
                            mongo:6
                        sleep 15
                        docker run -d \
                            --name expense-backend \
                            --network expense-net \
                            --restart unless-stopped \
                            -e MONGO_URI=mongodb://expense-mongo:27017/expenseapp \
                            -e PORT=5000 \
                            mahamiftikhar/expense-backend:latest
                        sleep 5
                        docker run -d \
                            --name expense-frontend \
                            --network expense-net \
                            --restart unless-stopped \
                            -p 80:80 \
                            mahamiftikhar/expense-frontend:latest
                    '
                """
                echo "App live at: http://${env.EC2_IP}"
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESS — App: http://${env.EC2_IP}"
        }
        failure {
            echo 'Pipeline FAILED. Check stage logs.'
        }
    }
}