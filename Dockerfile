# Étape 1 : Build Angular
FROM node:20-alpine AS build

# Répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances (plus rapide avec npm ci)
RUN npm ci

# Copier le reste du projet
COPY . .

# Builder l'application Angular en mode production
RUN npm run build -- --configuration production

# Étape 2 : Nginx pour servir l'application
FROM nginx:1.27-alpine

# Supprimer la config par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Angular vers le répertoire de Nginx
COPY --from=build /app/dist/frontoffice-samorywind/browser /usr/share/nginx/html

# Copier un fichier de configuration nginx custom (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
