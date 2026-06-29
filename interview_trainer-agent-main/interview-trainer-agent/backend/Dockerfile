FROM node:18-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
     poppler-utils \
     tesseract-ocr \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]