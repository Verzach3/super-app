export const onboardQuestions = {
  "locale": "es",
  "title": "Encuesta de Inicio",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question1",
          "title": {
            "es": "Primer Nombre"
          },
          "isRequired": true
        },
        {
          "type": "text",
          "name": "question2",
          "title": {
            "es": "Segundo Nombre"
          }
        },
        {
          "type": "text",
          "name": "question3",
          "title": {
            "es": "Primer Apellido"
          },
          "isRequired": true
        },
        {
          "type": "text",
          "name": "question4",
          "title": {
            "es": "Segundo Apellido"
          }
        },
        {
          "type": "text",
          "name": "question5",
          "title": {
            "es": "Fecha de Nacimiento"
          },
          "isRequired": true,
          "inputType": "date"
        },
        {
          "type": "radiogroup",
          "name": "question6",
          "title": {
            "es": "¿Cuál es el género/sexo que le fue asignado al nacer?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": {
                "es": "Masculino"
              }
            },
            {
              "value": "Item 2",
              "text": {
                "es": "Femenino"
              }
            }
          ]
        },
        {
          "type": "text",
          "name": "question7",
          "title": {
            "es": "Numero de Telefono"
          },
          "inputType": "tel"
        }
      ]
    }
  ]
}