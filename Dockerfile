FROM node:19

# Cria o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
RUN npm install

# Instala dependências necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    libappindicator3-1 \
    libnspr4 \
    libgbm1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copia o restante dos arquivos
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
