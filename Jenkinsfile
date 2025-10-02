pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/478mkharb/2048-game-project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t 2048-backend ./backend'
                sh 'docker build -t 2048-frontend ./frontend'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ 2048 Game deployed successfully!'
        }
        failure {
            echo '❌ Build or deploy failed. Check console logs.'
        }
    }
}

