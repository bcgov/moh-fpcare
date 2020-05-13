// Edit your app's name below
def APP_NAME = 'fpcare-sec'

def CHAINED_ANGULAR_BUILD = 'fpcare-sec' 

// Edit your environment TAG names below
def TAG_NAMES = ['dev', 'test']

// You shouldn't have to edit these if you're following the conventions
def NGINX_BUILD_CONFIG = 'nginx-runtime-sec'
def BUILD_CONFIG = APP_NAME + '-build'
def IMAGESTREAM_NAME = APP_NAME

node {

  stage('nginx runtime') {
    echo "Building: " + NGINX_BUILD_CONFIG
    openshiftBuild bldCfg: NGINX_BUILD_CONFIG, showBuildLogs: 'true'
  }

  stage(BUILD_CONFIG) {
    echo "Building: " + BUILD_CONFIG
    openshiftBuild bldCfg: BUILD_CONFIG, showBuildLogs: 'true'
  }

  stage(CHAINED_ANGULAR_BUILD) {
    echo "Building: " + CHAINED_ANGULAR_BUILD
    openshiftBuild bldCfg: CHAINED_ANGULAR_BUILD, showBuildLogs: 'true'
    IMAGE_HASH = sh (
       script: """oc get istag ${IMAGESTREAM_NAME}:latest -o template --template=\"{{.image.dockerImageReference}}\"|awk -F \":\" \'{print \$3}\'""",
	  returnStdout: true).trim()
    echo ">> IMAGE_HASH: $IMAGE_HASH"
  }

  stage('deploy-' + TAG_NAMES[0]) {
    echo "Deploy to " + TAG_NAMES[0] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"
    openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[0], srcStream: IMAGESTREAM_NAME, srcTag: "${IMAGE_HASH}"
  }
}                                                                                                                                                     
                                                                                                                                                      
node {                                                                                                                                                
  stage('deploy-' + TAG_NAMES[1]) {                                                                                                                   
    input "Deploy to " + TAG_NAMES[1] + "?"                                                                                                           
    echo "Deploy to " + TAG_NAMES[1] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"                                                                 
    openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[1], srcStream: IMAGESTREAM_NAME, srcTag: "${IMAGE_HASH}"           
  }                      
}
