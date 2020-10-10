function home(req, res) {
  res.render("index");
}

function calcularValor(req, res) {
  const { body: data } = req;
  const pregunta = data.pregunta;
  const descuento = parseFloat(data.descuento);
  const valor = parseFloat(data.valor);
  let valorPagar = valor,
    resta = 0,
    valorDescuento,
    respuesta;
  const errors = [];

  if (pregunta == undefined) {
    errors.push({ text: "Debes de escoger una opcion: Si o No" });
  }
  if (data.descuento == "" && data.pregunta == 1) {
    errors.push({ text: "Debes de escribir el descuento" });
  }
  if (data.descuento > 100 || data.descuento < 0) {
    errors.push({ text: "El valor ingresado esta fuera de los limites" });
  }
  if (data.valor === "") {
    errors.push({ text: "Escribe el avaluo comercial" });
  }
  if (errors.length > 0) {
    res.render("index", {
      errors,
      descuento: data.descuento,
      valor: data.valor,
    });
  } else {
    if (valor < 48029000) {
      valorPagar *= 0.015;
    } else if (valor > 48029000 && valor < 108063000) {
      valorPagar *= 0.025;
    } else {
      valorPagar *= 0.035;
    }
    if (pregunta == 1) {
      resta = valorPagar * (descuento / 100);
      valorDescuento = valorPagar - resta;
      respuesta = true;
    }
    const formatterPeso = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    const valorF = formatterPeso.format(valor).replace("COP", "$");
    const valorPagarF = formatterPeso.format(valorPagar).replace("COP", "$");
    const valorDescuentoF = formatterPeso
      .format(valorDescuento)
      .replace("COP", "$");
    const restaF = formatterPeso.format(resta).replace("COP", "$");
    res.render("liquidacion", {
      valorPagarF,
      valorPagar,
      valorDescuentoF,
      respuesta,
      restaF,
      valorF,
    });
  }
}

module.exports = {
  home,
  calcularValor,
};
