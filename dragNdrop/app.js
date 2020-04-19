const dragAndDrop = () => {

  //Selectors start
  const card = document.querySelector('.js-card');
  const cells = document.querySelectorAll('.js-cell')
  //Selectors end

  //Draggable start
  const dragStart = function(){
    setTimeout(()=>{
      this.classList.add('hide')
    }, 0)
  };
  
  const dragEnd = function() {
    this.classList.remove('hide')
  };

  const dragOver = function(event){
    event.preventDefault();
  };

  const dragEnter = function(event){
    event.preventDefault()
    this.classList.add('hovered');
  };

  const dragLeave = function(){
    this.classList.remove('hovered')
  };

  // append вставляет элемент внуть элемента на котором вызывается
  const dragDrop = function(){
    this.append(card);
    this.classList.remove('hovered');
  };
  //Draggable end

  //Перебор ячеек  => drop е будет работать без dragover
  cells.forEach((cell)=>{
    cell.addEventListener('dragover', dragOver);    
    cell.addEventListener('dragenter', dragEnter);   
    cell.addEventListener('dragleave', dragLeave); 
    cell.addEventListener('drop', dragDrop); 
  });
  //Event Listeners start
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
  //Event Listeners end
}
dragAndDrop();