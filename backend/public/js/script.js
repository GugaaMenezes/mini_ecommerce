fetch("/api/pricing", {
    method: "POST",
    body: formData, // Certifique-se de criar o formData corretamente
})
    .then((response) => {
        console.log('passei aqui');
    })
    .catch((error) => {
        // Lógica de tratamento de erro
        console.log('erro aqui');
    });
