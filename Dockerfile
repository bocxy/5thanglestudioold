FROM nginx:latest
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY  ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:12.4.0-alpine as build  
# WORKDIR /app  
# ENV PATH /app/node_modules/.bin:$PATH  
# COPY package.json /app/package.json   
# RUN npm install -g node-gyp 
# RUN npm install 
# RUN npm install react-scripts -g 
# COPY . /app  
# # # production environment  
# FROM nginx:latest  
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf  
# COPY --from=build /app/build /usr/share/nginx/html  
# EXPOSE 80  
# CMD ["nginx", "-g", "daemon off;"] 