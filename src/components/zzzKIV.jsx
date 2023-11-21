For icons in welcomepage:
import { IconButton } from "@chakra-ui/react";
import { TbMilk } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineToys } from "react-icons/md";
import { GiUnderwearShorts, GiNightSleep } from "react-icons/gi";

<div className="activities">
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Feed" //for screen readers to give it meaning
          fontSize="20px"
          name="Feed"
          value="Feed"
          type="click"
          onClick={activityOnClick}
          icon={<TbMilk />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Diaper" //for screen readers to give it meaning
          fontSize="20px"
          name="Diaper"
          value="Diaper"
          type="click"
          onClick={activityOnClick}
          icon={<GiUnderwearShorts />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Sleep" //for screen readers to give it meaning
          fontSize="20px"
          name="Sleep"
          value="Sleep"
          type="click"
          onClick={activityOnClick}
          icon={<GiNightSleep />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Play" //for screen readers to give it meaning
          fontSize="20px"
          name="Play"
          value="Play"
          type="click"
          onClick={activityOnClick}
          icon={<MdOutlineToys />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Play" //for screen readers to give it meaning
          fontSize="20px"
          name="Doctor's"
          value="Doctor's"
          type="click"
          onClick={activityOnClick}
          icon={<FaUserDoctor />}
        />
      </div>