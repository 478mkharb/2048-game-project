pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "2048-game-pipeline"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    // Navigate to workspace
                    dir("${WORKSPACE}") {
                        // Stop and remove previous containers
                        sh 'docker compose down || true'

                        // Build images and start containers
                        sh 'docker compose up -d --build'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "2048 Game deployed successfully!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}

