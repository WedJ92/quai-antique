# ===== Image du front Quai Antique =====
# Serveur Apache httpd : ton .htaccess fonctionne tel quel
FROM httpd:2.4-alpine

# Active mod_rewrite et autorise le .htaccess (routes de la SPA)
RUN sed -i \
        -e 's/^#\(LoadModule rewrite_module\)/\1/' \
        -e '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' \
        /usr/local/apache2/conf/httpd.conf

# Copie le site (les fichiers listés dans .dockerignore sont exclus)
COPY . /usr/local/apache2/htdocs/

EXPOSE 80
