pipeline {
  agent any

  environment {
    APP_DIR = 'project/nodejs-app'
  }

  stages {
    stage('Checkout codebase') {
      steps {
        echo 'Checking out codebase... ✅'
        checkout scm
      }
    }

    stage('Secret leak detection') {
      steps {
        echo 'Checking for secret leaks... 🔍'
        sh '''
          export PATH=$PATH:/usr/local/bin
          gitleaks detect --source . --no-banner
        '''
      }
    }

    stage('Dependency vulnerability check') {
      steps {
        echo 'Checking for dependency vulnerabilities... 🔒'
        sh '''
          trivy fs . || exit 1
        '''
      }
    }

    stage('Deploy vps') {
      steps {
        echo 'Deploying to VPS... 🌐'
        sh '''
          # Ensure the application directory exists
          if [ ! -d "$APP_DIR" ]; then
            echo "Creating application directory: $APP_DIR"
            mkdir -p $APP_DIR
          fi
          cd $APP_DIR

          npm install

          # Pull the latest code from the repository
          git pull

          npm run lint

          # Restart the application using PM2
          pm2 restart all || pm2 start app.js --name nodejs-app
          pm2 save
        '''
      }
    }
  }
}