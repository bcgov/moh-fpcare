#!/bin/bash

USER_ID="$(id -u)"
SCRIPT_DIR=$(dirname $0)
OUTPUT_DIR="${SCRIPT_DIR}/../"

# ===========================================================================
# Configure Deployment
# ===========================================================================
BUILD_NAME=${1}
TAG_NAME=${2}
IMAGE_NAMESPACE=${3}
APPLICATION_DOMAIN=${4}
DEPLOYMENT_CONFIG_TEMPLATE=${5}

DEPLOYMENT_CONFIG_POST_FIX=${6}
# -----------------------------------------------------------------------------------
#DEBUG_MESSAGES=1
# -----------------------------------------------------------------------------------
if [ -z "$BUILD_NAME" ]; then
	echo "You must supply BUILD_NAME."
	MissingParam=1
fi

if [ -z "$TAG_NAME" ]; then
	echo "You must supply TAG_NAME."
	MissingParam=1
fi

if [ -z "$IMAGE_NAMESPACE" ]; then
	echo "You must supply IMAGE_NAMESPACE."
	MissingParam=1
fi

if [ -z "$APPLICATION_DOMAIN" ]; then
	echo "You must supply APPLICATION_DOMAIN."
	MissingParam=1
fi

if [ -z "$DEPLOYMENT_CONFIG_TEMPLATE" ]; then
	echo "You must supply DEPLOYMENT_CONFIG_TEMPLATE."
	MissingParam=1
fi

if [ -z "$DEPLOYMENT_CONFIG_POST_FIX" ]; then
	DEPLOYMENT_CONFIG_POST_FIX="_DeploymentConfig.json"
	echo "Defaulting 'DEPLOYMENT_CONFIG_POST_FIX' to ${DEPLOYMENT_CONFIG_POST_FIX} ..."
	echo
fi

if [ ! -z "$MissingParam" ]; then
	echo "============================================"
	echo "One or more parameters are missing!"
	echo "--------------------------------------------"	
	echo "BUILD_NAME[{1}]: ${1}"
	echo "TAG_NAME[{2}]: ${2}"
	echo "IMAGE_NAMESPACE[{3}]: ${3}"
	echo "APPLICATION_DOMAIN[{4}]: ${4}"
	echo "DEPLOYMENT_CONFIG_TEMPLATE[{5}]: ${5}"
	echo "DEPLOYMENT_CONFIG_POST_FIX[{6}]: ${6}"
    echo "============================================"
	echo
	exit 1
fi
# -----------------------------------------------------------------------------------
DEPLOYMENT_CONFIG=${OUTPUT_DIR}${BUILD_NAME}${DEPLOYMENT_CONFIG_POST_FIX}
# ===================================================================================

echo "Generating deployment configuration for ${BUILD_NAME} ..."

if [ ! -z "$DEBUG_MESSAGES" ]; then
	echo
	echo "------------------------------------------------------------------------"
	echo "Parameters for call to 'oc process' for ${BUILD_NAME} ..."
	echo "------------------------------------------------------------------------"
	echo "Template=${DEPLOYMENT_CONFIG_TEMPLATE}"
	echo "NAME=${BUILD_NAME}"
	echo "TAG_NAME=${TAG_NAME}"
	echo "IMAGE_NAMESPACE=${IMAGE_NAMESPACE}"
	echo "APPLICATION_DOMAIN=${APPLICATION_DOMAIN}"
	echo "Output File=${DEPLOYMENT_CONFIG}"	
	echo "------------------------------------------------------------------------"
	echo
fi

oc process \
-f ${DEPLOYMENT_CONFIG_TEMPLATE} \
-p NAME=${BUILD_NAME} \
-p TAG_NAME=${TAG_NAME} \
-p IMAGE_NAMESPACE=${IMAGE_NAMESPACE} \
-p APPLICATION_DOMAIN=${APPLICATION_DOMAIN} \
> ${DEPLOYMENT_CONFIG}
echo "Generated ${DEPLOYMENT_CONFIG} ..."
echo
