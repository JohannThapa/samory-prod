# Samory – Mon Aide Cyber# frontoffice-samory-aide-cyber

# Build image
sudo docker build -t frontoffice-samorywind .

# run container 
docker run -d -p 8080:80 --name frontoffice frontoffice-samorywind

# samory-prod
