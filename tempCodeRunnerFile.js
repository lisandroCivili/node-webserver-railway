Relizamos este preoceso ↓↓↓ ya que "__dirname" no esta disponible en ESM. Lo que se hace es usar el modulo "path" de node
y la funcion "fileURLToPath" del modulo "url" para transformat el url del archivo en el cual estamos trabajando a un path
en forma de string.