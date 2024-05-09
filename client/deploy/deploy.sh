#!/bin/bash

# variables
REMOTE_SERVER=""
REMOTE_DIR="/home/pi/iot-sprinklers/client/build"
LOCAL_DIR="$HOME/Projects/iot-sprinklers/client"

# Check if local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
  echo "Local directory $LOCAL_DIR does not exist. Aborting."
  exit 1
fi

# Check if remote directory exists
ssh -p 5555 "$REMOTE_SERVER" "[ -d \"$REMOTE_DIR\" ]" || {
  echo "Remote directory $REMOTE_DIR does not exist. Aborting."
  exit 1
}

# Change to the local directory
cd "$LOCAL_DIR" || {
  echo "Cannot change directory to $LOCAL_DIR. Aborting."
  exit 1
}

# Build React app
yarn build

# Copy build files to Raspberry Pi server
rsync -avzP -e "ssh -p 5555" --delete "$LOCAL_DIR/build/" "$REMOTE_SERVER:$REMOTE_DIR/" || {
  echo "Failed to synchronize files. Aborting."
  exit 1
}

# SSH into Raspberry Pi server and restart
ssh -p 5555 "$REMOTE_SERVER" "pm2 restart ui" || {
  echo "Failed to restart app on the Raspberry Pi server. Manual intervention required."
  exit 1
}

# Done!
echo "Successfully deployed React app to Raspberry Pi server."
