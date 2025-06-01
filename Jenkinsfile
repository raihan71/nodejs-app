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

    stage('Lint code quality') {
      steps {
        echo 'Linting code... 📝'
        sh '''
          npm ci
          # Run ESLint to check for code quality issues
          npx eslint . --ext .js,.jsx,.ts,.tsx || exit 1
        '''
      }
    }

    stage('Secret leak detection') {
      steps {
        echo 'Checking for secret leaks... 🔍'
        sh '''
          export PATH=$PATH:/usr/local/bin
          git detect --source . --no-banner
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

    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies... 🚀'
        sh '''
          # Install Node.js dependencies
          npm ci
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

          # Pull the latest code from the repository
          git pull

          # Restart the application using PM2
          pm2 restart all || pm2 start app.js --name nodejs-app
          pm2 save
        '''
      }
    }
  }
}