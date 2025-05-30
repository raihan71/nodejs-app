pipeline {
  agent any

  environment {
    APP_DIR = 'project/nodejs-app'
  }

  stages {
    stage('Checkout codebase') {
      steps {
        echo 'Checking out codebase... ✅'
      }
    }

    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies... 🚀'
        sh '''

          # Ensure the application directory exists
          if [ ! -d "$APP_DIR" ]; then
            echo "Creating application directory: $APP_DIR"
            mkdir -p $APP_DIR
          fi
          cd $APP_DIR

          # Get the latest code from the repository
          git pull origin main

          # Install Node.js dependencies
          npm install

          # Restarting the application
          pm2 restart all || pm2 start app.js --name nodejs-app
          pm2 save
        '''
      }
    }
  }
}