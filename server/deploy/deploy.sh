#!/bin/bash

# variables
REMOTE_SERVER="pi@192.168.86.201"
REMOTE_DIR="/home/pi/iot-sprinklers/server/build"
LOCAL_DIR="$HOME/Projects/iot-sprinklers/server"

# Check if local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
  echo "Local directory $LOCAL_DIR does not exist. Aborting."
  exit 1
fi

# Check if remote directory exists
ssh "$REMOTE_SERVER" "[ -d \"$REMOTE_DIR\" ]" || {
  echo "Remote directory $REMOTE_DIR does not exist. Aborting."
  exit 1
}

# Change to the local directory
cd "$LOCAL_DIR" || {
  echo "Cannot change directory to $LOCAL_DIR. Aborting."
  exit 1
}

# Build nodejs app
yarn build

# Copy build files to Raspberry Pi server
rsync -avzP -e "ssh" --delete "$LOCAL_DIR/build/" "$REMOTE_SERVER:$REMOTE_DIR/" || {
  echo "Failed to synchronize files. Aborting."
  exit 1
}

# SSH into Raspberry Pi server and restart
ssh "$REMOTE_SERVER" "pm2 restart api" || {
  echo "Failed to restart app on the Raspberry Pi server. Manual intervention required."
  exit 1
}

# Done!
echo "Successfully deployed nodejs app to Raspberry Pi server."