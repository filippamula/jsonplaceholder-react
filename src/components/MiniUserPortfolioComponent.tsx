import { UserCircleIcon } from "@heroicons/react/24/outline";
import { User } from "../model/User";

interface PortfolioProps {
    user: User;
}

const MiniUserPortfolioComponent: React.FC<PortfolioProps> = ({ user }) => {

    return (
        <div className="relative flex items-center gap-x-4">
            <UserCircleIcon className="h-10 w-10 rounded-full bg-gray-50" />
            <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                    <a>
                        <span className="absolute inset-0" />
                        {user.name}
                    </a>
                </p>
                <p className="text-gray-600">{user?.company?.name}</p>
            </div>
        </div>
    )
};

export default MiniUserPortfolioComponent;
