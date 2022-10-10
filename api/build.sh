#!/bin/sh

realpath() {
    [[ $1 = /* ]] && {
        echo "$1"
        return 0
    }

    [[ "$1" = "." ]] && {
        echo "$PWD"
        return 0
    }

    echo "$PWD/${1#./}"
}

BASE_DIR=$( dirname "$0" )
ABS_DIR=$( realpath $BASE_DIR )

echo "$@" | grep '\-\-build' > /dev/null && {
    cd $ABS_DIR && \
    echo "Backend Build: Installing npm dependencies for main package..." && \
    npm install --production
    
    cd $ABS_DIR/info && \
    echo "Backend Build: Installing npm dependencies for info package..." && \
    npm install --production
}

echo "$@" | grep '\-\-deploy' > /dev/null && {
    [ ! -d $ABS_DIR/node_modules ] && {
        echo "Missing node_modules/ directory, please run 'sh $0 --build' first."
        exit 1
    }
    
    [ ! -d $ABS_DIR/info/node_modules ] && {
        echo "Missing info/node_modules/ directory, please run 'sh $0 --build' first."
        exit 1
    }
    
    echo "Backend Deploy: Deploying Lambda functions using Serverless framework..."
    serverless deploy
}

exit 0