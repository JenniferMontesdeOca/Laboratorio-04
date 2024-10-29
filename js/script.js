// Definición de la clase Student
class Student {
    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }
    
    addCourse(name, level) {
        this.courses.push({ name, level });
    }
    
    matchesCourse(courseName, level) {
        return this.courses.some(course => course.name === courseName && course.level <= level);
    }
}

// Definición de la clase Teacher
class Teacher {
    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }
    
    addCourse(name, level) {
        this.courses.push({ name, level });
    }
    
    matchesCourse(courseName, level) {
        return this.courses.some(course => course.name === courseName && course.level >= level);
    }
}

// Definición de la clase Tutoring
class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(name, surname, email) {
        this.students.push(new Student(name, surname, email));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher(name, surname, email));
    }

    getStudentByName(name, surname) {
        return this.students.find(student => student.name === name && student.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student =>
            teacher.courses.some(course =>
                student.matchesCourse(course.name, course.level)
            )
        );
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher =>
            student.courses.some(course =>
                teacher.matchesCourse(course.name, course.level)
            )
        );
    }
}

// Ejemplo de uso
let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);

let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);

let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);

console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...}
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}
