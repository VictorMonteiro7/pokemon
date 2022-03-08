export function acharCaminho(data: { [key: string]: string | {} }) {
  if (data["front_default"] != null) {
    return data["front_default"]; //Aqui pega a imagem podrão do front_default
  } else {
    for (let type in data) {
      let res = data[type];
      if (res) {
        let arrTeste: {}[] = [];
        let teste = Object.values(res);
        teste.forEach((item: {} | string) =>
          Object.values(item).every((b: {}) => arrTeste.push(b))
        );
        arrTeste = arrTeste.filter((a) => a != null); //limpando os valores nulos
        let response = arrTeste.find(
          (a) => typeof a !== "object" && a !== "undefined"
        );
        if (response) return response;
        if (arrTeste.length > 0) {
          let teste2 = arrTeste.map((item) =>
            Object.values(item).find((a) => a != null)
          );
          teste2 = teste2.filter((a) => a != null);
          return teste2[1];
        }
      }
    }
  }
}
