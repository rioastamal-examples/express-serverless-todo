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
    echo "Backend Build: Installing npm dependencies..."
    npm install --production
}

echo "$@" | grep '\-\-deploy' > /dev/null && {
    [ ! -d $ABS_DIR/node_modules ] && {
        echo "Missing node_modules/ directory, please run 'sh $0 --build' first."
        exit 1
    }
    
    echo "Backend Deploy: Deploying Lambda functions using Serverless framework..."
    serverless deploy
}

exit 0