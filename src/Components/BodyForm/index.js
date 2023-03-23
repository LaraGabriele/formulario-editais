import React, { useState, useEffect } from "react";
import "./style.css";
import Alert from "../Alert";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";

const BodyForm = () => {
  const buResp = [
    { value: 1, label: "Business Intelligence" },
    { value: 2, label: "BWA" },
    { value: 3, label: "Cabeamento" },
    { value: 4, label: "Colaboração" },
    { value: 5, label: "DataCenter" },
    { value: 6, label: "Desenvolvimento de Software" },
    { value: 7, label: "Digital Application" },
    { value: 8, label: "Gestão" },
    { value: 9, label: "Internet" },
    { value: 10, label: "Locação Academy" },
    { value: 11, label: "Receita de Parceiros" },
    { value: 12, label: "Redes Corporativas" },
    { value: 13, label: "Satélite" },
    { value: 14, label: "Segurança Cybernética & Privacidade" },
    { value: 15, label: "Serviços Gerenciados" },
    { value: 16, label: "Video e Acesso" },
    { value: 17, label: "Yssy Academy" },
  ];

  const [cliente, setCliente] = useState("");
  const [numEdital, setNumEdital] = useState("");
  const [portal, setPortal] = useState("");
  const [escopo, setEscopo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [buRes, setBuRes] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const validation = () => {
    const erros = {};

    if (!cliente) {
      erros.cliente = "Por favor, informe o nome do cliente";
    }

    if (!numEdital) {
      erros.numEdital = "Por favor, informe o número do edital";
    }

    if (!portal) {
      erros.portal = "Por favor, informe o nome do portal";
    }

    if (!escopo) {
      erros.escopo = "Por favor, informe o escopo do projeto";
    }

    if (!cnpj) {
      erros.cnpj = "Por favor, informe o CNPJ da empresa";
    }

    if (!fabricante) {
      erros.fabricante = "Por favor, informe o fabricante";
    }

    if (!dataHora) {
      erros.dataHora = "Por favor, informe a data e hora de abertura do pregão";
    }

    setErros(erros);

    return Object.keys(erros).length === 0;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (validation()) {
      //objeto do arquivo
      const fileObject = {
        name: arquivo.name,
        content: arquivo,
      };

      sp.web
        .getFolderByServerRelativeUrl("/sites/GED/clientes/lib_editais")
        .files.add(fileObject.name, fileObject.content, true)
        .then(() => {
          console.log();

          // enviar dados para o banco
          console.log(
            "Dados do formulário:",
            {
              cliente,
              numEdital,
              portal,
              escopo,
              cnpj,
              buRes,
              fabricante,
              dataHora,
            }`Arquivo ${fileObject.name} enviado para a biblioteca com sucesso!`
          );

          setSucesso(true);
          setCliente("");
          setNumEdital("");
          setPortal("");
          setEscopo("");
          setCnpj("");
          setBuRes("");
          setFabricante("");
          setDataHora("");
          setArquivo(null);
        })
        .catch((error) => {
          console.log(`Erro ao enviar arquivo: ${error}`);
        });
    }
  }

  function handleFileChange(event) {
    setArquivo(event.target.files[0]);
  }

  useEffect(() => {
    if (sucesso) {
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
      }, 3000);
    }
  }, [sucesso]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Qualificação de Edital</h1>
      </div>
      <div className="row-form box1" align="Center">
        <div className="column-form col-2">
          <label htmlFor="input-cliente">Cliente</label>
          <input
            type="text"
            placeholder="Nome do cliente"
            id="input-cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          {erros.cliente && (
            <span className="error-message">{erros.cliente}</span>
          )}
        </div>

        <div className="column-form">
          <label htmlFor="input-numEdital">Nº do Edital</label>
          <input
            type="text"
            placeholder="N° do Edital"
            id="input-numEdital"
            value={numEdital}
            onChange={(e) => setNumEdital(e.target.value)}
          />
          {erros.numEdital && (
            <span className="error-message">{erros.numEdital}</span>
          )}
        </div>
        <div className="column-form">
          <label htmlFor="input-portal">Portal</label>
          <input
            type="text"
            placeholder="Portal"
            id="input-portal"
            value={portal}
            onChange={(e) => setPortal(e.target.value)}
          />
          {erros.portal && (
            <span className="error-message">{erros.portal}</span>
          )}
        </div>
      </div>

      <div className="row-form box2">
        <div className="column-form">
          <label htmlFor="input-escopo">Escopo do projeto</label>
          <textarea
            placeholder="Escopo"
            id="input-escopo"
            value={escopo}
            onChange={(e) => setEscopo(e.target.value)}
          />
          {erros.escopo && (
            <span className="error-message">{erros.escopo}</span>
          )}
        </div>

        <div className="column-form">
          <label htmlFor="input-cnpj">
            CNPJ(s) da(s) empresa(s) licitante(s)
          </label>
          <textarea
            placeholder="CNPJ da(s) empresas"
            id="input-cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          {erros.cnpj && <span className="error-message">{erros.cnpj}</span>}
        </div>
      </div>

      <div className="row-form box3">
        <div className="column-form">
          <label htmlFor="input-fabricante">Fabricante</label>
          <input
            type="text"
            placeholder="Fabricante"
            id="input-fabricante"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
          {erros.fabricante && (
            <span className="error-message">{erros.fabricante}</span>
          )}
        </div>

        <div className="column-form">
          <label htmlFor="input-dataHora">
            Data e Horário de Abertura do Pregrão
          </label>
          <input
            type="datetime-local"
            id="input-dataHora"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
          />
          {erros.dataHora && (
            <span className="error-message">{erros.dataHora}</span>
          )}
        </div>
      </div>

      <div className="row-form box3">
        <div className="column-form">
          <label htmlFor="input-buRes">BU Responsável</label>
          <select
            id="buRes"
            value={buRes}
            onChange={(e) => setBuRes(e.target.value)}
          >
            {buResp.map((b, i) => {
              return (
                <option key={i} value={b.value}>
                  {b.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="column-form">
          <label htmlFor="input-arquivo">Anexar o edital</label>
          <input
            type="file"
            id="input-arquivo"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="row-form btn">
        <button type="submit">Enviar</button>
      </div>

      <Alert message="Enviado com sucesso!" show={sucesso} />
    </form>
  );
};

export default BodyForm;
