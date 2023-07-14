from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import random
import string

from core.question_tags.models import Tag
User = get_user_model()


def generate_random_name():
    # Generate a random name using uppercase letters and digits
    letters_and_digits = string.ascii_uppercase + string.digits
    random_name = ''.join(random.choice(letters_and_digits) for _ in range(10))
    return random_name


class Command(BaseCommand):
    help = 'Adds 10 instances of Tag model with random names'

    def handle(self, *args, **options):
        for _ in range(10):
            tag = Tag(
                name=generate_random_name(),
                description="Random description",
                synonym=None,  # Modify this if needed
                creator=User.objects.first(),  # Modify the user ID if needed
            )
            tag.save()

        self.stdout.write(self.style.SUCCESS('Successfully added 10 tags.'))
