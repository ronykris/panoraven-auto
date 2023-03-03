FROM puppeteer:latest
WORKDIR /upload
COPY . /upload
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]