fetch("/api/pricing", {
    method: "POST",
    body: formData,
})
    .then((response) => {
        console.log('passei aqui');
    })
    .catch((error) => {
        
        console.log('erro aqui');
    });
