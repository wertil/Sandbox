magic_number = [3, 9]
chances = 3
for attempt in range(chances):
    user_number = int(input("enter number: "))
    print("This is attempt {}".format(attempt+1));
    if user_number in magic_number:
        print("right")
    if user_number not in magic_number:
        print("wrong")
