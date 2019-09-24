def get_player_numbers():
    number_csv = input("Enter your 6 numbers, seperated by commas: ")
    # create set of integers from number_csv
    number_list = number_csv.split(",")
    integer_set = {int(number) for number in number_list}
    return integer_set

print(get_player_numbers())

        
    
