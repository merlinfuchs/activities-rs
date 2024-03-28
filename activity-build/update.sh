# Clone repository
git clone https://github.com/discord/embedded-app-sdk

# Install dependencies
cd embedded-app-sdk && npm i

# Bundle into single file
esbuild src/index.ts --bundle --outfile=../src/static/sdk.js --platform=browser --format=esm

# Cleanup
cd .. && rm -rf embedded-app-sdk