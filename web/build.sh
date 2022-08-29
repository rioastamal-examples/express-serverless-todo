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

[ -z "$APP_API_BASE_URL" ] && {
    echo "Missing APP_API_BASE_URL env." >&2
    exit 1
}

BASE_DIR=$( dirname "$0" )
ABS_DIR=$( realpath $BASE_DIR )

mkdir -p $ABS_DIR/build

echo "$@" | grep '\-\-build' > /dev/null && {
    echo "Frontend Build: Replacing APP_API_BASE_URL with ${APP_API_BASE_URL}..."
    sed "s#{{API_BASE_URL}}#$APP_API_BASE_URL#g" index.html > $ABS_DIR/build/index.html
}

exit 0