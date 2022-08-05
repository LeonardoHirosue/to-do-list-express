const setTagAsDone = async (element, id) => {
    //preventDefault serve previnir qualquer tipo de comportamento da tag quando clicar o botão
    event.preventDefault();
    try {
        //-----------Chamada para o Back-end-------------
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let body = JSON.stringify({task: { done: element.checked}});
        let response = await fetch(`/tasks/${id}?_method=put`, {headers: headers, body: body, method: 'PUT'});
        let data = await response.json();
        let task = data.task;
        //pegando o elemento do ejs
        let parent = element.parentNode;
        //-----------Chamada para o Back-end-------------

        if(task.done){
            element.checked = true;
            parent.classList.add('has-text-success');
            parent.classList.add('is-italic');
        } else {
            element.checked = false;
            parent.classList.remove('has-text-success');
            parent.classList.remove('is-italic');
        }
    } catch (error) {
        alert('Erro ao atualizar a tarefa...');
    }
};