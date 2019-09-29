import random

def menu():
    #Ask player for numbers
    user_numbers = get_player_numbers()
    
    #calculate lottery numbers
    lottery_numbers = create_lottery_numbers()
    
    #print out the winnings
    matched_numbers = user_numbers.intersection(lottery_numbers)
    print("You matched {}. You won ${}!".format(matched_numbers,100**len(matched_numbers)))

#User can pick 6 numbrs
def get_player_numbers():
    number_csv = input("Enter your 6 numbers, seperated by commas: ")
    # create set of integers from number_csv
    number_list = number_csv.split(",")
    integer_set = {int(number) for number in number_list}
    return integer_set

#calculate 6 random numbers
def create_lottery_numbers():
    values = set()
    while len(values) < 6:
        values.add(random.randint(1,20))
    return values

#match numbers with lottery numbers
    
menu()

        
    
