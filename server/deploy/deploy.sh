#!/bin/bash

# variables
REMOTE_SERVER="pi@192.168.86.41"
REMOTE_DIR="/home/pi/iot-sprinklers/server"
LOCAL_DIR="~/Projects/iot-sprinklers/server"

# Change in directory
cd $LOCAL_DIR

# Build React app
yarn build

# Copy build files to Raspberry Pi server
rsync -avz --delete "$LOCAL_DIR/build/*" "$REMOTE_SERVER:$REMOTE_DIR"


# SSH into Raspberry Pi server and restart
ssh "$REMOTE_SERVER" << EOF
  pm2 restart api
EOF

# Done!
echo "Successfully deployed React app to Raspberry Pi server."
