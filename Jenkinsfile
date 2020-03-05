pipeline {
    agent any
    
    tools {nodejs "recent"}
    stages {
        stage('Build') { 
            steps {
                sh 'npm --version'
                sh 'npm install' 
            }
        }
    }
}