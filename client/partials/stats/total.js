Template.totalHours.helpers({
    hoursInTotal: () => {
        let total = 0;
        Tasks.find().map(function(task) {
            total += task.time;
        });
        return total;
    },
    tasksInTotal: () => {
        return Tasks.find().count();
    },
    ongoingTaskInTotal: () => {
        return Tasks.find({done:false}).count();
    }
});