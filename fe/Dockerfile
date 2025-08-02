FROM node:22-alpine3.22
WORKDIR /app

COPY . .
# RUN npm install expo

RUN ls
RUN npm install

CMD ["npx", "expo", "start", "--port", "3000"]
EXPOSE 3000