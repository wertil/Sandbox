import random

magic_number = [random.randint(0,9), random.randint(0,9)]

def ask_user_and_check_number():
    user_number = int(input("enter number: "))
    if user_number in magic_number:
       return "right"
    if user_number not in magic_number:
        return "wrong"



def run_program_x_times(chances):
    for attempt in range(chances):
        print("This is attempt {}".format(attempt+1));
        print(ask_user_and_check_number())

chances = int(input("how many chances do you want: "))
run_program_x_times(chances)


##minimum = 100
##for index in range(10):
##    random_number = random.randint(0,100)
##    print("Random Number is {}".format(random_number))
##    if random_number <= minimum:
##        minimum = random_number
##        
