node {
    def customImage = [:]

    stage('Clone Repository') {
        // Checkout your source code repository
        checkout scm
    }

    stage('Build Docker Image') {
        // Define the Docker image name and tag
        def dockerImage = 'dhanuprys/kalender-adat-server:latest'

        // Build Docker image
        customImage = docker.build(dockerImage, '-f Dockerfile .')
    }

    stage('Push Docker Image') {
        withCredentials([
            usernamePassword(
                credentialsId: 'docker-hub-dhanuprys',
                passwordVariable: 'DOCKER_PASSWORD',
                usernameVariable: 'DOCKER_USERNAME'
            )
        ]) {
            // Log in to Docker registry
            sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
            // Push the Docker image to the registry
            customImage.push()
        }
    }

    stage('Cleanup Image') {
        sh 'docker rmi dhanuprys/kalender-adat-server:latest'
    }
}
