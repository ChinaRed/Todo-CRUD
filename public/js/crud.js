$(function(){

// select all the checkboxes
$("li.todo input[type=checkbox]").change(function(){
    // get the id of the mongo document
    var doc_id = $(this).data('todo-id');
    
    
    if( $(this).prop( "checked" ) ){
        $(this).parents("li").addClass("complete");
        // checkbox was checked
        // issue a PUT request to complete_todos route
        $.ajax('/todos/'+doc_id+'/complete', { 
            method : "PUT"
        });

    }else{
        $(this).parents("li").removeClass("complete");
        // checkbox was unchecked
        // issue a PUT request to uncomplete_todos route
        $.ajax('/todos/'+doc_id+'/uncomplete', { 
            method : "PUT"
        });
        console.log(this);
    }
});

$("button.edit").click(function(){
    $(".todo_info").toggle(".hidden");
    $(".edit_form").toggle(".hidden");
});

});