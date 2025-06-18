//Variables
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

//Eventos
daily.addEventListener("click", fetchData);
weekly.addEventListener("click", fetchData);
monthly.addEventListener("click", fetchData);

//Funciones 
function fetchData(e) {
    const periodo = e.target.id;
    const etiquetas = {
        daily: 'Previous',
        weekly: 'Last Week',
        monthly: 'Last Month'
    }
    //Llamado al JSON
    fetch('data.json')
        .then(response => {
            //Si el estado es NOT FOUND lanza error
            if (!response.ok) {
                throw new Error("No se pudo cargar el JSON");
            }
            // si es correcto devuelve la respuesta como json
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                //Pasar el titulo para que sea compatible con el id
                const title = item.title.toLowerCase().replace(/\s+/g, '-');
                const { current, previous } = item.timeframes[periodo];

                const currentElement = document.getElementById(`${title}-current`)
                const previousElement = document.getElementById(`${title}-previous`)

                //Validar que los elementos en el DOM existan
                if (currentElement && previousElement) {
                    currentElement.textContent = `${current}hrs`
                    previousElement.textContent = `${etiquetas[periodo]} - ${previous}hrs`
                } else {
                    console.log(`Elemento NO encontrado para ${title}`)
                }
            })
        })
        .catch(error => console.error("Error al cargar datos:", error));
}