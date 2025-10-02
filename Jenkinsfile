pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/478mkharb/2048-game-project.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh 'docker build -t 2048-backend ./backend'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh 'docker build -t 2048-frontend ./frontend'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}
