import { Response } from "./types";
import { ClassConstructor, plainToClass } from "class-transformer";
import axios, { AxiosRequestConfig } from "axios";

function toCamel(str: string) {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

function isObject(obj: any) {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function"
  );
}
function isArray(a: any) {
  return Array.isArray(a);
}

export function keysToCamel(obj: any): any {
  if (isObject(obj)) {
    const n = Object();

    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = keysToCamel(obj[k]);
    });

    return n;
  } else if (isArray(obj)) {
    return obj.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return obj;
}

export function getHeaders(authToken: string): Headers {
  return new Headers({
    Authorization: "Token " + authToken,
    "Content-Type": "application/json; charset=UTF-8",
  });
}

export function withThousandSeparator(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function fixedLenght(number: number, lenght: number): string {
  return ("0".repeat(lenght) + number).slice(-lenght);
}
export function reformatDateDayMonth(
  date: Date | string,
  useUTC = true
): string {
  if (typeof date == "string" || date instanceof String) {
    date = new Date(date);
  }

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthNumber = useUTC ? date.getUTCMonth() : date.getMonth();
  const dayNumber = fixedLenght(useUTC ? date.getUTCDate() : date.getDate(), 2);

  return `${months[monthNumber]} ${dayNumber}`;
}
``;
export function reformatDate(date: string, addTimeZoneFix = true): string {
  const dateString = addTimeZoneFix ? date + "Z" : date;
  const _date = new Date(dateString);

  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const day = days[_date.getDay()];

  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const month = months[_date.getMonth()];

  const dayNumber = fixedLenght(_date.getDate(), 2);
  const year = _date.getFullYear();
  const hours = fixedLenght(_date.getHours(), 2);
  const minutes = fixedLenght(_date.getMinutes(), 2);
  return `${day} ${dayNumber} ${month} ${year}, a las ${hours}:${minutes}`;
}

/**
 * Transforma la fecha ingresada como parametro en String utilizando el
 * ISO 8601. Por ejemplo 1995-10-19
 * @param date Fecha que se quiere formatear
 * @returns Retorna un String en formato ISO8601 de la fecha ingresada
 */
export function reformatDateISO8601(date: Date, useUTC = true): string {
  const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
  const monthNumber = fixedLenght(
    (useUTC ? date.getUTCMonth() : date.getMonth()) + 1,
    2
  );
  const dayNumber = fixedLenght(useUTC ? date.getUTCDate() : date.getDate(), 2);
  return `${year}-${monthNumber}-${dayNumber}`;
}

/**
 * Obtiene un string con la fecha ingresada como parametro en horario UTC.
 * @param date Fecha que se quiere convertir
 * @returns Retorna un string con el formato ISO en hora UTC
 */
export function dateToUTCString(date: Date): string {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

/**
 * @param url URL del endpoint donde se hara la consulta
 * @param token Token que se enviara en el header de autenticación
 * @param method Metodo utilizado en la request (POST, GET...)
 * @param data Data tipo objeto o Record enviada en el cuerpo de la request
 * @param formData data tipo FormData enviada en el cuerpo de la request
 * @param classParseType Clase que parseará de la respuesta obtenida
 * @param parseArray Indicador de si se espera realizar un parse de arreglos
 * @returns Retorna una promesa de respuesta
 */
export async function getResponse(
  url: string,
  token?: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Record<string, any>,
  formData?: FormData,
  classParseType?: ClassConstructor<any>,
  parseArray = false
): Promise<Response<any>> {
  try {
    const headers: Record<string, string> = {};
    if (!formData) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      data: formData || data,
    };

    const response = await axios(config);

    if (response.status === 204) {
      return {
        code: response.status,
        data: null,
        success: true,
      };
    }

    let parsedResponseData = keysToCamel(response.data);

    if (classParseType) {
      if (parseArray) {
        parsedResponseData = parsedResponseData.map((value: any) =>
          plainToClass(classParseType, value)
        );
      } else {
        parsedResponseData = plainToClass(classParseType, parsedResponseData);
      }
    }

    return {
      code: response.status,
      data: parsedResponseData,
      success: true,
    };
  } catch (error: any) {
    return {
      code: error.response?.status || 500,
      data: null,
      success: false,
    };
  }
}

export async function fetchDownloadFileBodyRequired(
  url: string,
  token: string,
  method = "GET",
  fileName: string,
  data?: Record<string, any>
) {
  const headers = new Headers();
  if (token) headers.append("Authorization", "Bearer " + token);
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(data);
  return fetch(url, { method, headers, body })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}
export async function fetchGetFileBodyRequired(
  url: string,
  token: string,
  method = "GET",
  fileName: string,
  data?: Record<string, any>
  // classParceType?: ClassConstructor<any>,
) {
  const headers = new Headers();
  if (token) headers.append("Authorization", "Bearer " + token);
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(data);
  return fetch(url, { method, headers, body }).then((response) =>
    response.blob()
  );
}

export function toBadgeFormat(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export function printContent(contentId: string) {
  // Get HTML to print from element
  const prtHtml = document.getElementById(contentId)?.innerHTML;

  // Get all stylesheets HTML
  let stylesHtml = "";
  for (const node of [
    ...document.querySelectorAll('link[rel="stylesheet"], style'),
  ]) {
    stylesHtml += node.outerHTML;
  }

  // Open the print window
  const WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );
  if (!WinPrint) return;

  WinPrint.document.write(`<!DOCTYPE html>
  <html>
    <head>
    ${stylesHtml}
    </head>
    <body>
      ${prtHtml}
    </body>
  </html>`);

  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}

/* Convirte un string a snake case */
function toSnake(str: string) {
  return str.replace(/[A-Z]/g, ($1) => {
    return $1.replace($1, "_" + $1.toLowerCase());
  });
}

/* Modifica las keys de un objeto a snake case */
export function keysToSnake(obj: any): any {
  if (isObject(obj)) {
    const n = Object();

    Object.keys(obj).forEach((k) => {
      n[toSnake(k)] = keysToSnake(obj[k]);
    });

    return n;
  } else if (isArray(obj)) {
    return obj.map((i: any) => {
      return keysToSnake(i);
    });
  }

  return obj;
}

export function booleanToAffirmation(value: boolean): string {
  return value ? "Sí" : "No";
}

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function validateRut(completeRut: string) {
  const validFormat = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(completeRut);
  if (!validFormat) return false;

  const tmp = completeRut.split("-");
  let digv = tmp[1];
  let rut = Number(tmp[0]);
  if (digv == "K") digv = "k";

  let M = 0,
    S = 1;
  for (; rut; rut = Math.floor(rut / 10))
    S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;
  const expectedDigv = S ? S - 1 : "k";

  return expectedDigv == digv;
}

/**
 * Genera y retorna una cadena de caracteres aleatoria
 * @param length Largo de la cadena aleatoria
 * @returns Retorna una cadena aleatoria del largo establecido en el parametro
 */
export function makeRandomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// resumen de casa funcion
// toCamel(str: string): Esta función convierte una cadena en formato snake_case o kebab-case a camelCase. Por ejemplo, convierte "hello_world" en "helloWorld".

// isObject(obj: any): Esta función verifica si un valor dado es un objeto.

// isArray(a: any): Esta función verifica si un valor dado es un arreglo.

// keysToCamel(obj: any): any: Esta función recorre recursivamente un objeto o arreglo y convierte todas las claves (propiedades) de formato snake_case o kebab-case a camelCase.

// getHeaders(authToken: string): Headers: Esta función crea y devuelve un objeto Headers utilizado para enviar cabeceras HTTP, especialmente para solicitudes de API que requieran un token de autenticación y se envíen datos en formato JSON.

// withThousandSeparator(number: number): string: Esta función toma un número y agrega puntos como separadores de miles para facilitar la lectura.

// fixedLenght(number: number, lenght: number): string: Esta función toma un número y lo convierte en una cadena con una longitud fija, rellenando con ceros a la izquierda si es necesario.

// reformatDateDayMonth(date: Date | string, useUTC = true): string: Esta función formatea una fecha en el formato "Mes Día" (por ejemplo, "Enero 01") y permite especificar si se debe usar la hora en formato UTC o no.

// reformatDate(date: string, addTimeZoneFix = true): string: Esta función toma una fecha en formato ISO8601 y la formatea en un formato personalizado, incluyendo el día de la semana, el día, el mes, el año y la hora.

// reformatDateISO8601(date: Date, useUTC = true): string: Esta función convierte una fecha en un formato ISO8601 con una opción para usar la hora en formato UTC o no.

// dateToUTCString(date: Date): string: Esta función convierte una fecha en una cadena con formato ISO8601 y ajusta la hora para que esté en horario UTC.

// getResponse(...): Esta función realiza una solicitud HTTP a una URL dada, con opciones para incluir un token de autorización, el método de solicitud, los datos que se enviarán y una clase que parseará la respuesta.

// fetchDownloadFileBodyRequired(...): Esta función realiza una solicitud HTTP para descargar un archivo y guarda el archivo en el cliente.

// fetchGetFileBodyRequired(...): Esta función realiza una solicitud HTTP para obtener un archivo y devuelve el contenido del archivo como una respuesta de tipo blob.

// toBadgeFormat(value: number): string: Esta función formatea un número para incluir puntos como separadores de miles y redondea el valor.

// capitalizeFirstLetter(string: string): Esta función capitaliza la primera letra de una cadena.

// printContent(contentId: string): Esta función imprime el contenido de un elemento HTML con el ID proporcionado.

// toSnake(str: string): Esta función convierte una cadena en formato camelCase o kebab-case a snake_case.

// keysToSnake(obj: any): any: Esta función recorre recursivamente un objeto o arreglo y convierte todas las claves (propiedades) de formato camelCase o kebab-case a snake_case.

// booleanToAffirmation(value: boolean): string: Esta función convierte un valor booleano en una cadena que representa afirmación o negación, es decir, "Sí" o "No".

// delay(time: number): Esta función devuelve una promesa que se resolverá después de un retraso de tiempo especificado en milisegundos.

// validateRut(completeRut: string): Esta función valida si un número de RUT (Rol Único Tributario) ingresado es válido.

// makeRandomString(length: number): Esta función genera una cadena aleatoria de caracteres con la longitud especificada.