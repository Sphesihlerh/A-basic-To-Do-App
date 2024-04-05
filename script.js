const taskForm = document.getElementById('taskForm');
const taskTitlesList = document.getElementById('taskTitles');
const taskDescriptionsList = document.getElementById('taskDescriptions');
const completeButtonsList = document.getElementById('completeButtons');
const deleteButtonsList = document.getElementById('deleteButtons');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  addTask(taskTitle, taskDescription);
  taskForm.reset();
});

function addTask(title, description) {
  const taskItem = document.createElement('li');
  const taskTitleItem = document.createElement('li');
  const taskDescriptionItem = document.createElement('li');
  const completeButtonItem = document.createElement('li');
  const deleteButtonItem = document.createElement('li');

  taskTitleItem.textContent = title;
  taskDescriptionItem.textContent = description;
  
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', function() {
    markAsCompleted(taskTitleItem, taskDescriptionItem, completeButtonItem, deleteButtonItem);
  });
  completeButtonItem.appendChild(completeButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    taskTitleItem.remove();
    taskDescriptionItem.remove();
    completeButtonItem.remove();
    deleteButtonItem.remove();
  });
  deleteButtonItem.appendChild(deleteButton);

  taskTitlesList.appendChild(taskTitleItem);
  taskDescriptionsList.appendChild(taskDescriptionItem);
  completeButtonsList.appendChild(completeButtonItem);
  deleteButtonsList.appendChild(deleteButtonItem);
}

function markAsCompleted(titleItem, descriptionItem, completeButtonItem, deleteButtonItem) {
  titleItem.classList.add('completed');
  const completeButton = completeButtonItem.querySelector('button');
  completeButton.textContent = 'Undo';
  completeButton.removeEventListener('click', markAsCompleted);
  completeButton.addEventListener('click', function() {
    markAsPending(titleItem, descriptionItem, completeButtonItem, deleteButtonItem);
  });
  // Move to Completed Task section
  document.getElementById('completedTasks').appendChild(titleItem);
  document.getElementById('completedTasks').appendChild(descriptionItem);
  document.getElementById('completedTasks').appendChild(completeButtonItem);
  document.getElementById('completedTasks').appendChild(deleteButtonItem);
}

function markAsPending(titleItem, descriptionItem, completeButtonItem, deleteButtonItem) {
  titleItem.classList.remove('completed');
  const completeButton = completeButtonItem.querySelector('button');
  completeButton.textContent = 'Complete';
  completeButton.removeEventListener('click', markAsPending);
  completeButton.addEventListener('click', function() {
    markAsCompleted(titleItem, descriptionItem, completeButtonItem, deleteButtonItem);
  });
  // Move back to Pending Task section
  document.getElementById('pendingTasks').appendChild(titleItem);
  document.getElementById('pendingTasks').appendChild(descriptionItem);
  document.getElementById('pendingTasks').appendChild(completeButtonItem);
  document.getElementById('pendingTasks').appendChild(deleteButtonItem);
}
