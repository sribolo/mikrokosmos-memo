from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Grant staff access to an existing user account."

    def add_arguments(self, parser):
        parser.add_argument("username", help="Username to promote to staff.")
        parser.add_argument(
            "--superuser",
            action="store_true",
            help="Also grant superuser permissions.",
        )

    def handle(self, *args, **options):
        username = options["username"].strip()
        if not username:
            raise CommandError("Username is required.")

        user_model = get_user_model()

        try:
            user = user_model.objects.get(username=username)
        except user_model.DoesNotExist as exc:
            raise CommandError(f'User "{username}" does not exist.') from exc

        user.is_staff = True
        if options["superuser"]:
            user.is_superuser = True
            user.save(update_fields=["is_staff", "is_superuser"])
            self.stdout.write(self.style.SUCCESS(f'Set "{username}" as staff + superuser.'))
            return

        user.save(update_fields=["is_staff"])
        self.stdout.write(self.style.SUCCESS(f'Set "{username}" as staff.'))
