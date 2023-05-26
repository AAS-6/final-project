FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install .
COPY prisma .
RUN npx prisma generate
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
