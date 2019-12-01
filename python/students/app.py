
student_list = []

def create_student():
	name = input("Enter your name: ")	
	student_data = { 
		'name': name,  
		'marks': []
	}	
	return student_data

def add_mark(student, mark):
	student['marks'].append(mark)

def calculate_average_mark(student):
	number = len(student['marks'])
	if number == 0:
		return 0

	total = sum(student['marks'])
	return total / number

# s = create_student()
# add_mark(s, 1)
# add_mark(s, 0)
# print(calculate_average_mark(s))

def print_student_details(student):
	print("{}, average mark: {}".format(student["name"],calculate_average_mark(student)))

def print_student_list(students):
	for student in students:
		print_student_details(student)	