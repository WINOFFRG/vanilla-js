// CRUD
import Task from "./task.js";
export const taskOperations = {
	tasks: [],
	add(id, name, desc, date, url) {
		const task = new Task(id, name, desc, date, url);
		this.tasks.push(task);
		console.log("Added ", this.tasks);
		return task;
	},
	deletedMarked() {
		this.tasks = this.tasks.filter((task) => !task.isMarked);
		return this.tasks;
	},
	mark(id) {
		let task = this.tasks.find((task) => task.id == id);
		if (task) {
			task.toggle();
		}
	},
	countMarked() {
		return this.tasks.filter((task) => task.isMarked).length;
	},
	countUnmarked() {
		return this.tasks.length - this.countMarked();
	},
};