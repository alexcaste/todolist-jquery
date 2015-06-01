
$(document).ready(function() {
  $("#add-subtask").click(function() {
    $("#new-subtasks").append('<div class="new-subtask">' +
                                '<div class="form-group">' +
                                  '<label for="new-sub-task-name">Sub-Task Name:</label>' +
                                  '<input type="text" class="form-control new-sub-task-name">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-sub-due">Sub Task Due Date</label>' +
                                  '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-sub-description">Sub Task Description:</label>' +
                                  '<input type="text" class="form-control" id="new-sub-description">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-note">Note:</label>' +
                                  '<input type="text" class="form-control" id="new-new-note">' +
                                '</div>' +
                              '</div>');
});




  $("form#new-task").submit(function(event) {
    event.preventDefault();
    var inputTaskName = $("input#new-task-name").val();
    var inputDueDate = $("input#new-due-date").val();
    var inputDescription = $("input#new-description").val();
    var id = $.expando+Math.random()

    var newTask = { ident: id, taskName: inputTaskName, dueDate: inputDueDate, taskDesc: inputDescription, subtasks: [] };

    var test = newTask.ident

    var todo = []
    var complete = []

    todo.push(newTask)

    $(".new-subtask").each(function() {
      var inputSubName = $(this).find("input.new-sub-task-name").val();
      var inputSubDate = $(this).find("input.new-sub-due").val();
      var inputSubDescription = $(this).find("input.new-sub-description").val();
      var inputSubNote = $(this).find("input.new-new-note").val();

      var newSubTask = { subName: inputSubName, subDate: inputSubDate, subDesc: inputSubDescription, subNote: inputSubNote };

      newTask.subtasks.push(newSubTask);
    });

    debugger;
    $("ul#tasks").append("<li><span class='task'>" +
                            newTask.taskName +
                            ", Due: " +
                            newTask.dueDate +
                            "</span><div class = 'delete' id='" +
                            newTask.ident +
                            "'>" +
                              "(x)" +
                            "</div>" +
                          "</li>"
                          );

    $(".delete" ).last().click(function() {
          var id = $(this).attr( "id" );
          complete.push(newTask)
          $(this).parent().remove();

          complete.forEach(function(done){
            $("ul#done-tasks").text(done.taskName);
          })

        });

    $(".task").last().click(function() {
      $("#show-task").show();

      todo.forEach(function(task){
        $("#show-task h3").text(task.taskName);
        $(".due-date").text(task.dueDate);
        $(".description").text(task.taskDesc);
      })



      $("#subtasks").text("");
      newTask.subtasks.forEach(function(subtask) {
        $("#subtasks").append("<ol>"+
                                "<li> Subtask:" + subtask.subName +
                                  "<ul>" +
                                    "<li> Due Date:" + subtask.subDate + "</li>" +
                                    "<li> Description:" + subtask.subDesc + "</li>" +
                                    "<li> Notes:" + subtask.subNote + "</li>" +
                                  "</ul>" +
                                "</li>" +
                              "</ol>");
      });
    });
    $("input#new-task-name").val("");
    $("input#new-due-date").val("");
    $("input#new-description").val("");
    $("input.new-sub-task-name").val("");
    $("input.new-sub-due").val("");
    $("input.new-sub-description").val("");
    $("input.new-new-note").val("");

  });
});
